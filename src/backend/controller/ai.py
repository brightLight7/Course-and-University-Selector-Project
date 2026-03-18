from dotenv import load_dotenv
import os
import json

from openai import OpenAI

load_dotenv(override=True)

client = OpenAI()
openai_api_key = os.getenv('OPENAI_API_KEY')

if openai_api_key:
    print(f"OpenAI API Key exists and begins {openai_api_key[:8]}")
else:
    print("OpenAI API Key not set in environment variables.")
    print("If you have already set the key, please check the .env file in the AI directory.")

# with open('../data/testing-json-files/personaTest1.json') as file:
#     persona_test1 = json.load(file)

# with open('../data/testing-json-files/testUniversitiesTemplate.json') as file:
#     test_universities = json.load(file)

# with open('../data/testing-json-files/testCoursesTemplate.json') as file:
#     test_courses = json.load(file)

# with open("../AI/sample_response.json", "r") as file:
#     sample_response = json.load(file)

def map_names_to_ids(recommendations, courses, universities):
    course_lookup = {course["course_name"]: course["course_id"] for course in courses}
    university_lookup = {university["university_name"]: university["university_id"] for university in universities}

    for course in recommendations["recommended_courses"]:
        course["course_id"] = course_lookup.get(course["course_name"], course["university_name"])
        course["university_id"] = university_lookup.get(course["university_name"])

    for university in recommendations["recommended_universities"]:
        university["university_id"] = university_lookup.get(university["university_name"])

    return recommendations


def generate_recommendations(user_answers, courses, universities):
    system_prompt = """
    You are an AI recommendation engine for a Course and University Decision-Support System.
    Return STRICT JSON only.
    Recommend both courses and universities.
    Rank all recommendations in order.
    Include suitability_score from 0 to 100.
    Include a short explanation for each recommendation.
    Do not include any text outside JSON.
    """

    user_prompt = f"""
    Quiz Answers: {json.dumps(user_answers, indent=2)}
    Available Universities: {json.dumps(universities, indent=2)}
    Available Courses: {json.dumps(courses, indent=2)}

    Return JSON in this format:
    {{
        "recommended_courses": [
            {{
                "course_name": "string",
                "university_name": "string",
                "rank_position": 1,
                "suitability_score": 95,
                "explanation": "string"
            }}
        ],
        "recommended_universities": [
            {{
                "university_name": "string",
                "rank_position": 1,
                "suitability_score": 90,
                "explanation": "string"
            }}
        ]
    }}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
        {
            "role": "system",
            "content": system_prompt,
        },
        {
            "role": "user",
            "content": user_prompt,
        },
        ],
    )

    content = response.choices[0].message.content

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        raise ValueError("OpenAI returned invalid JSON. Please check the response content for details.")

