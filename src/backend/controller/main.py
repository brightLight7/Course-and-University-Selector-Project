from controller.ai import generate_recommendations, map_names_to_ids
from model.queries import (
    get_user_answers,
    get_courses,
    get_universities,
    get_courses,
    get_universities,
    save_course_recommendation,
    save_university_recommendation
)

def run_recommendation_pipeline(attempt_id):
    user_answers = get_user_answers(attempt_id)
    courses = get_courses()
    universities = get_universities()

    recommendations = generate_recommendations(
        user_answers=user_answers,
        courses=courses,
        universities=universities
    )

    mapped_recommendations = map_names_to_ids(recommendations=recommendations, courses=courses, universities=universities)

    save_course_recommendation(attempt_id, mapped_recommendations["recommended_courses"])
    save_university_recommendation(attempt_id, mapped_recommendations["recommended_universities"])  

    return mapped_recommendations


if __name__ == "__main__":
    result = run_recommendation_pipeline(1)
    print(result)