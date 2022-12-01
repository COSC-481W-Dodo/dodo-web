export interface FullCardSet {
    tags: Array<Tag>;
    flashcards: Array<Card>;
}

export interface Card {
    id: string;
    question: string;
    answer: string;
    userId?: string;
    tags?: Array<string>;
}

export interface Tag {
    id: string;
    name: string;
    authors?: Array<string>
}

export interface FilterForm {
    showOnlyCurrentUser: boolean;
    selected: Array<string>;
}