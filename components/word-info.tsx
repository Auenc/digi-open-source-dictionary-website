import { Word } from "osdpjs"

export interface WordInfoProps {
    word: Word
}

export const WordInfo: React.FC<WordInfoProps> = ({word}) => {
    console.log('word', word)
    return <h1>Hello, word info!</h1>
}