import { PropTypes } from 'prop-types';

const CodeexplanationError = ({ error }) => {
    return (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Error:</h2>
            <p>{error}</p>
        </div>
    )
}

CodeexplanationError.propTypes = {
    error: PropTypes.string.isRequired
};

export default CodeexplanationError;