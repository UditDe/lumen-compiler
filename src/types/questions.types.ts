export interface test_cases_type {
    input: String;
    output: String;
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
    _id: String;
    question_description: String;
    question_title: String;
    test_cases: test_cases_type[];
    tags: tag_type[];
    difficulty: difficulty_type;
    created_at: Date
}