import { PropTypes } from 'prop-types';

const CodeexplanationResult = ({ data }) => {
    return (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg whitespace-pre-wrap">
            <h2 className="text-lg font-semibold mb-2">Explanation:</h2>
            <pre className="whitespace-pre-wrap">{data.explanation}</pre>

            <h2 className="text-lg font-semibold mt-4 mb-2">Remarks:</h2>
            <pre className="whitespace-pre-wrap">{data.remarks}</pre>

            <h2 className="text-lg font-semibold mt-4 mb-2">Score:</h2>
            <pre className="whitespace-pre-wrap">{data.score}</pre>
        </div>
    )
}

CodeexplanationResult.propTypes = {
    data: PropTypes.shape({
        explanation: PropTypes.string.isRequired,
        remarks: PropTypes.string.isRequired,
        score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }).isRequired
};

export default CodeexplanationResult;