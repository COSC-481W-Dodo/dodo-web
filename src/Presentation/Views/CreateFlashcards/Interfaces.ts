export interface FullCardSet {
    tags: Array<Tag>;
    flashcards: Array<Card>;
}

export interface Card {
    question: string;
    answer: string;
}

export interface Tag {
    tagName: string;
}