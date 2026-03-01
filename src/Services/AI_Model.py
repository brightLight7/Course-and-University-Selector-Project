from dotenv import load_dotenv
load_dotenv(override=True)

import os
from openai import OpenAI
openai = OpenAI()


openai_api_key = os.getenv('OPENAI_API_KEY')

if openai_api_key:
    print(f"OpenAI API Key exists and begins {openai_api_key[:8]}")
else:
    print("OpenAI API Key not set in environment variables.")
    print("If you have already set the key, please check the .env file in the AI directory.")


from dotenv import load_dotenv
load_dotenv(override=True)

import os
openai_api_key = os.getenv('OPENAI_API_KEY')

from openai import OpenAI
openai = OpenAI()

import json

with open('../Data/jsonFiles/personaTest1.json') as file:
    persona_test1 = json.load(file)

with open('../Data/jsonFiles/testUniversitiesTemplate.json') as file:
    test_universities = json.load(file)

with open('../Data/jsonFiles/testCoursesTemplate.json') as file:
    test_courses = json.load(file)

with open("../AI/sample_response.json", "r") as file:
    sample_response = json.load(file)

# print(persona_test1)

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {
            "role": "system",
            # "content": "You are an expert course and university advisor. Based on the user's quiz answers, recommend the top 3 most suitable courses and universities from the provided lists. Justify each recommendation with specific reasons related to the user's preferences and needs."
            "content": "Read sample_response.json and output what the contents are in a clear and concise manner. I need to test whether you can read the JSON file correctly."
        },
        {
            "role": "user",
            # "content": f"Quiz Answers: {json.dumps(sample_response)}\n\nAvailable Universities: {json.dumps(test_universities)}\n\nAvailable Courses: {json.dumps(test_courses)}\n\nPlease provide your recommendations."
            "content": f"Quiz Read: {json.dumps(sample_response)}"
        }       
    ]
)

print(response.choices[0].message.content)

