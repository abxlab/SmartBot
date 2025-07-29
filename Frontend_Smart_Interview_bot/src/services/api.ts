const API_BASE_URL = 'http://localhost:8000'; // Update this to your FastAPI backend URL

export const generateQuestion = async (difficulty: string, topic: string): Promise<{ question: string }> => {
  const response = await fetch(`${API_BASE_URL}/generate-question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ difficulty, topic }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const evaluateAnswer = async (answer: string): Promise<{ feedback: string; score: number }> => {
  const response = await fetch(`${API_BASE_URL}/evaluate-answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answer }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};