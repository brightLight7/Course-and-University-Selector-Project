import os

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from controller.ai import generate_recommendations
from model.queries import get_courses, get_universities, create_attempt, save_course_recommendation, save_university_recommendation, signup_user, get_user_by_email, get_user_saves

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

    courses = get_courses()
    universities = get_universities()

    recommendations = generate_recommendations(user_answers, courses, universities)

    assessment_lookup = {
        (c["course_name"], c["university_name"]): c["assessment_method_summary"]
        for c in courses
    }

    return jsonify({
        "recommendedCourses": [
            {
                "courseName": course["course_name"],
                "universityName": course["university_name"],
                "suitabilityScore": course["suitability_score"],
                "explanation": course["explanation"],
                "detailedExplanation": course["detailed_explanation"],
                "assessmentMethodSummary": assessment_lookup.get((course["course_name"], course["university_name"])),
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

    user_id = data.get("userId")
    attempt_id = create_attempt(user_id)

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

@app.post("/api/auth/signup")
def signup():
    data = request.get_json()
    first_name = data.get("firstName", "")
    email = data["email"]
    password = data["password"]

    if get_user_by_email(email):
        return jsonify({"message": "An account with this email already exists."}), 409

    password_hash = generate_password_hash(password)
    user = signup_user(first_name, email, password_hash)

    return jsonify({
        "userId": user["user_id"],
        "firstName": user["first_name"],
        "email": user["email"],
    })

@app.post("/api/auth/login")
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    user = get_user_by_email(email)
    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"message": "Invalid email or password."}), 401

    return jsonify({
        "userId": user["user_id"],
        "firstName": user["first_name"],
        "email": user["email"],
    })

@app.get("/api/user/<int:user_id>/saves")
def user_saves(user_id):
    saves = get_user_saves(user_id)
    return jsonify(saves)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.getenv("PORT")), debug=False)
    

