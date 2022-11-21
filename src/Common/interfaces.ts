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

export interface FlashcardDatabase {
    id: string
    question: string;
    answer: string;
    userId: string;
    tags: Array<string>;
}

export interface TagDatabase {
    authors: Array<string>;
    name: string;
}

export interface FilterFlashcardData {
    showOnlyCurrentUser: boolean;
    selected: Array<string>;
}