import React, { useEffect, useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import { utils } from 'ethers';

import styles from './Lists.module.css';

// GraphQL query to retrieve notices given a cursor
const GET_NOTICES = gql`
query GetNotices($cursor: String) {
    notices(first: 10, after: $cursor) {
        totalCount
        pageInfo {
            hasNextPage
            endCursor
        }
        edges {
            node {
                index
                payload
            }
        }
    }
}`;

type ProductAction = {
    id: string;
    name: string;
    action: 'add' | 'delete';
};

type ListProductsProps = {
    onNewNotice: (length: number) => void;
};

const ListProducts: React.FC<ListProductsProps> = ({ onNewNotice }) => {
    const [notices, setNotices] = useState([]);
    const [cursor, setCursor] = useState(null);

    // Retrieve notices every 500 ms
    const { loading, error, data } = useQuery(GET_NOTICES, {
        variables: { cursor },
        pollInterval: 500,
    });

    useEffect(() => {
        // Check query result
        console.log(data)
        const length = data?.notices?.edges?.length;
        if (length) {
            // Update cursor so that next GraphQL poll retrieves only newer data
            setCursor(data.notices.pageInfo.endCursor);
        }
        // Render new echoes
        const newNotices = data?.notices?.edges?.map(({ node }: { node: any }) => {
            // Render echo from notice
            const entry = JSON.parse(utils.toUtf8String(node.payload));
            console.log(`Detected new entry : ${JSON.stringify(entry)} `);
            return entry;
        });
        if (newNotices) {
            // Concat new echoes with previous ones
            setNotices((prev) => {
                return prev.concat(newNotices);
            });
        }
    }, [data]);

    useEffect(() => {
        onNewNotice(notices.length);
    }, [notices]);

    return (
        <div className="w-100">
            <p><b>Logs (Notices)</b></p>
            <table className={styles.notices}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {notices.map((p: ProductAction) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            {p.action === 'add' ? <td className={styles.green}>{p.action}</td> : null}
                            {p.action === 'delete' ? <td className={styles.red}>{p.action}</td> : null}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProducts;
