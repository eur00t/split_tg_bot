import '../scss/highScores.scss';
import React from 'react';

function getName(first_name, last_name) {
    const arr = [];

    if (first_name != null) {
        arr.push(first_name);
    }

    if (last_name != null) {
        arr.push(last_name);
    }

    if (arr.length === 0) {
        arr.push('Anonymous');
    }

    return arr.join(' ');
}

export default ({ data, loading }) => {
    let table;
    if (true) {
        table = (
            <table>
                <thead>
                    <tr>
                        <th className="col-position" />
                        <th className="col-name">Name</th>
                        <th className="col-score">Score</th>
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
                                    <td className="col-position">
                                        {position + '.'}
                                    </td>
                                    <td className="col-name">
                                        {getName(first_name, last_name)}
                                    </td>
                                    <td className="col-score">
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
    if (false) {
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
