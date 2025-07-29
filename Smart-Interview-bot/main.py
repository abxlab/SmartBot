from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cohere
import re

# -------------------- Cohere Setup --------------------
co = cohere.Client("i1kHhLsmmvfJLCWunMvJ25GVqOuaryCSn1aDsUvY")

# -------------------- FastAPI Setup --------------------
app = FastAPI(title="Smart Interview Bot API")

# Enable CORS (Allow frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to specific frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Pydantic Models --------------------
class QuestionRequest(BaseModel):
    difficulty: str
    topic: str

class AnswerRequest(BaseModel):
    answer: str

class FeedbackResponse(BaseModel):
    feedback: str
    score: int

# -------------------- Core Logic Functions --------------------
def get_interview_question(difficulty: str, topic: str) -> str:
    prompt = (
        f"Give me a {difficulty.lower()} coding interview question on the topic of {topic}. "
        "Keep the question under 80 words."
    )
    response = co.generate(
        model="command",
        prompt=prompt,
        max_tokens=100,
        temperature=0.7,
    )
    return response.generations[0].text.strip()

def evaluate_answer(answer: str) -> str:
    prompt = f"""
You are a senior technical interviewer evaluating a candidate's answer to a coding interview question.

Candidate's answer:
\"\"\"{answer}\"\"\"

Please evaluate the answer based on:
1. Correctness
2. Clarity
3. Efficiency
4. Completeness

Give helpful feedback and end with a score like:  
**Score: X/10**

If the answer is invalid, say:  
"This answer is not valid or relevant."  
**Score: 0/10**
"""
    response = co.generate(
        model="command",
        prompt=prompt,
        max_tokens=500,
        temperature=0.6,
    )
    return response.generations[0].text.strip()

def extract_score(feedback: str) -> int:
    match = re.search(r"Score\s*[:\-]?\s*(\d{1,2})/10", feedback, re.IGNORECASE)
    return min(max(int(match.group(1)), 0), 10) if match else 0

# -------------------- API Endpoints --------------------
@app.post("/generate-question")
def generate_question(req: QuestionRequest):
    try:
        question = get_interview_question(req.difficulty, req.topic)
        return {"question": question}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/evaluate-answer", response_model=FeedbackResponse)
def evaluate(req: AnswerRequest):
    if len(req.answer.strip()) < 10:
        raise HTTPException(status_code=400, detail="Answer too short or unclear.")
    feedback = evaluate_answer(req.answer)
    score = extract_score(feedback)
    return {"feedback": feedback, "score": score}
