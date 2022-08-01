import { NextPage } from 'next'
import { WordSearch } from '../../word-search'

export const Index: NextPage = () => {
    return (
        <>
            <WordSearch initialSearchSelect='false' initialWordToSearch='' initialWordType='verb' result={null} />
        </>
    )
}
