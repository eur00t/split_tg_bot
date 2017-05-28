import React from 'react';

export default ({ data, loading }) => {
    let table;
    if (!loading) {
        table = (
            <table>
                <thead>
                    <tr>
                        <th />
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(
                        ({
                            position,
                            score,
                            user: { id, first_name, last_name }
                        }) => {
                            return (
                                <tr key={id}>
                                    <td>
                                        {position}
                                    </td>
                                    <td>
                                        {first_name + ' ' + last_name}
                                    </td>
                                    <td>
                                        {score}
                                    </td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        );
    }

    let loading_;
    if (loading) {
        loading_ = (
            <div>
                loading...
            </div>
        );
    }

    return (
        <div className="high-scores">
            <h1>High Scores</h1>
            {table}
            {loading_}
        </div>
    );
};