export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface QuizResult {
  score: number
  total: number
  accuracy: number
  avgResponseTime: number
  efficiencyLevel: string
  efficiencyColor: string
}

const aimlQuestions: Question[] = [
  {
    id: 1,
    question: "Which algorithm is best suited for classification tasks with labeled data?",
    options: ["K-Means Clustering", "Supervised Learning (SVM)", "PCA", "DBSCAN"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What does the 'bias-variance tradeoff' refer to in machine learning?",
    options: [
      "Choosing between CPU and GPU",
      "Balancing underfitting and overfitting",
      "Selecting the right programming language",
      "Deciding between batch and online learning",
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Which activation function is most commonly used in hidden layers of deep neural networks?",
    options: ["Sigmoid", "Tanh", "ReLU", "Softmax"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "What is the primary purpose of dropout in neural networks?",
    options: [
      "Speed up training",
      "Reduce overfitting by randomly disabling neurons",
      "Increase model complexity",
      "Normalize input data",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Which metric is most appropriate for evaluating an imbalanced classification dataset?",
    options: ["Accuracy", "F1-Score", "Mean Squared Error", "R-Squared"],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "What does a convolutional layer in a CNN primarily detect?",
    options: ["Temporal patterns", "Spatial features and patterns", "Sequential dependencies", "Cluster centroids"],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "Which technique is used to handle the vanishing gradient problem in RNNs?",
    options: ["Batch Normalization", "LSTM / GRU architectures", "Max Pooling", "Data Augmentation"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "What is the role of the attention mechanism in transformer models?",
    options: [
      "Reducing model size",
      "Weighing the importance of different input tokens",
      "Performing dimensionality reduction",
      "Generating random noise",
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "In reinforcement learning, what does the 'reward signal' represent?",
    options: [
      "The loss function gradient",
      "Feedback on how good an action was",
      "The learning rate",
      "The number of training epochs",
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Which of the following is an unsupervised learning algorithm?",
    options: ["Random Forest", "Logistic Regression", "K-Means Clustering", "Gradient Boosting"],
    correctAnswer: 2,
  },
  {
    id: 11,
    question: "What does 'epoch' mean in the context of training a neural network?",
    options: [
      "A single forward pass",
      "One complete pass through the entire training dataset",
      "The time taken for one batch",
      "The number of layers in the network",
    ],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "Which regularization technique adds a penalty proportional to the absolute value of weights?",
    options: ["L2 Regularization (Ridge)", "L1 Regularization (Lasso)", "Elastic Net", "Dropout"],
    correctAnswer: 1,
  },
]

const pythonQuestions: Question[] = [
  {
    id: 1,
    question: "What is the output of `type([]) is list` in Python?",
    options: ["True", "False", "TypeError", "None"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Which keyword is used to create a generator function in Python?",
    options: ["return", "yield", "generate", "async"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is the time complexity of accessing an element in a Python dictionary?",
    options: ["O(n)", "O(log n)", "O(1) average case", "O(n log n)"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Which of the following is immutable in Python?",
    options: ["List", "Dictionary", "Set", "Tuple"],
    correctAnswer: 3,
  },
  {
    id: 5,
    question: "What does the `__init__` method do in a Python class?",
    options: [
      "Destroys an object",
      "Initializes a new object instance",
      "Creates a static method",
      "Defines a class variable",
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "What is a decorator in Python?",
    options: [
      "A type of loop",
      "A function that modifies another function's behavior",
      "A data structure",
      "A built-in exception",
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "Which module is used for regular expressions in Python?",
    options: ["regex", "re", "pattern", "match"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "What does `list comprehension` provide in Python?",
    options: [
      "A way to compress files",
      "A concise way to create lists",
      "A method for sorting",
      "A type of exception handling",
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "What is the difference between `==` and `is` in Python?",
    options: [
      "No difference",
      "`==` checks value equality, `is` checks identity",
      "`is` checks value, `==` checks type",
      "Both check type only",
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "Which Python data structure uses FIFO ordering?",
    options: ["Stack", "Queue", "Dictionary", "Set"],
    correctAnswer: 1,
  },
  {
    id: 11,
    question: "What does the `with` statement do in Python?",
    options: [
      "Creates a loop",
      "Manages resource cleanup via context managers",
      "Defines a function",
      "Imports a module",
    ],
    correctAnswer: 1,
  },
  {
    id: 12,
    question: "What will `'hello'[::-1]` return?",
    options: ["'hello'", "'olleh'", "'h'", "Error"],
    correctAnswer: 1,
  },
]

export function getQuizQuestions(subject: string): Question[] {
  const normalizedSubject = subject.trim().toLowerCase()
  const pool = normalizedSubject === "aiml" ? aimlQuestions : pythonQuestions
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 10)
}

export function calculateResult(
  answers: Record<number, number>,
  questions: Question[],
  responseTimes: Record<number, number>
): QuizResult {
  let score = 0
  questions.forEach((q, index) => {
    if (answers[index] === q.correctAnswer) {
      score++
    }
  })

  const total = questions.length
  const accuracy = Math.round((score / total) * 100)

  const times = Object.values(responseTimes)
  const avgResponseTime = times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0

  let efficiencyLevel: string
  let efficiencyColor: string

  if (accuracy >= 90 && avgResponseTime < 15) {
    efficiencyLevel = "Elite Performer"
    efficiencyColor = "text-emerald-400"
  } else if (accuracy >= 80) {
    efficiencyLevel = "Highly Efficient"
    efficiencyColor = "text-green-400"
  } else if (accuracy >= 60) {
    efficiencyLevel = "Moderately Efficient"
    efficiencyColor = "text-yellow-400"
  } else if (accuracy >= 40) {
    efficiencyLevel = "Needs Improvement"
    efficiencyColor = "text-orange-400"
  } else {
    efficiencyLevel = "Requires Focused Study"
    efficiencyColor = "text-red-400"
  }

  return {
    score,
    total,
    accuracy,
    avgResponseTime: Math.round(avgResponseTime * 10) / 10,
    efficiencyLevel,
    efficiencyColor,
  }
}
