import { ReactNode } from 'react';

type QueryResultProps<T> = {
    result: T[];
};

function QueryResult<T>({ result }: QueryResultProps<T>) {
    return (
        <table>
            <thead>
                <tr>
                    {Object.keys(result[0] as object).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {result.map((item, index) => (
                    <tr key={index}>
                        {/* {Object.values(item).map((value, index) => (
                            <td key={index}>{value as ReactNode}</td>
                        ))} */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default QueryResult;
