export interface test_cases_type {
    input: string;
    output: string;
}

export const ALLOWED_TAGS = [
    "array",
    "recursion",
    "bit-manipulation",
    "tree",
    "stack",
    "queue",
    "linked-list",
    "heap",
    "graph",
    "sorting",
] as const;
export const DIFFICULTY_LEVEL = ["easy", "medium", "hard"] as const;

export type tag_type = (typeof ALLOWED_TAGS)[number];
export type difficulty_type = (typeof DIFFICULTY_LEVEL)[number];

export interface question_type {
    _id?: string;
    question_title: string;
    question_description: string;
    test_cases: test_cases_type[];
    tags: tag_type[];
    difficulty: difficulty_type;
    created_at: Date;
}

export type CreateQuestionDAO = {
  question_title: string;
  question_description: string;
  test_cases: test_cases_type[];
  tags: tag_type[];
  difficulty: difficulty_type;
};

export type SaveQuestionResult = {
  id: string;
  created_at: Date;
};


export interface question_uploaded_response {
    _id?: string;
    status?: "success" | "failed";
    created_at?: Date;
    error?: string;
}
