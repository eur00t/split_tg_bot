import '../scss/highScores.scss';
import React from 'react';

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
                                        {first_name + ' ' + last_name}
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
