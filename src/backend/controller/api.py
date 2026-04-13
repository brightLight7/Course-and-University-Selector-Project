from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timezone
from controller.ai import generate_recommendations
from model.queries import get_courses, get_universities, create_attempt, save_course_recommendation, save_university_recommendation

app = Flask(__name__)
CORS(app)

@app.post("/api/recommendations/generate")
def generate():
    data = request.get_json()
    answers = data["answers"]

    user_answers = [
        {"question": key, "selected_option": value}
        for key, value in answers.items()
    ]

    recommendations = generate_recommendations(user_answers)

    return jsonify({
        "recommendedCourses": [
            {
                "courseName": course["course_name"],
                "universityName": course["university_name"],
                "suitabilityScore": course["suitability_score"],
                "explanation": course["explanation"],
                "detailedExplanation": course["detailed_explanation"],
            }
            for course in recommendations["recommended_courses"]
        ],
        "recommendedUniversities": [
            {
                "universityName": uni["university_name"],
                "suitabilityScore": uni["suitability_score"],
                "explanation": uni["explanation"],
                "detailedExplanation": uni["detailed_explanation"],
            }
            for uni in recommendations["recommended_universities"]
        ],
        "generatedAt": datetime.now(timezone.utc).isoformat(),
    })

@app.post("/api/results/save")
def save():
    data = request.get_json()
    results = data["results"]

    courses = get_courses()
    universities = get_universities()

    course_lookup = {c["course_name"]: c["course_id"] for c in courses}
    uni_lookup = {u["university_name"]: u["university_id"] for u in universities}

    attempt_id = create_attempt()

    recommended_courses = [
        {
            "course_id": course_lookup.get(c["courseName"]),
            "rank_position": i + 1,
            "suitability_score": c["suitabilityScore"],
            "explanation": c["explanation"],
        }
        for i, c in enumerate(results["recommendedCourses"])
        if course_lookup.get(c["courseName"])
    ]

    recommended_universities = [
        {
            "university_id": uni_lookup.get(u["universityName"]),
            "rank_position": i + 1,
            "suitability_score": u["suitabilityScore"],
            "explanation": u["explanation"],
        }
        for i, u in enumerate(results["recommendedUniversities"])
        if uni_lookup.get(u["universityName"])
    ]

    save_course_recommendation(attempt_id, recommended_courses)
    save_university_recommendation(attempt_id, recommended_universities)

    return jsonify({
        "attemptId": attempt_id,
        "savedAt": datetime.now(timezone.utc).isoformat(),
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
    

