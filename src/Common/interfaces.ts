export interface FullCardSet {
    tags: Array<Tag>;
    flashcards: Array<Card>;
}

export interface Card {
    id: string;
    question: string;
    answer: string;
}

export interface Tag {
    id: string;
    tagName: string;
}