/**
 * Controller wrapper to handle async errors and hide sensitive error details.
 * @param {Function} fn - The controller function to wrap.
 * @returns {Function} Wrapped controller.
 */
const wrapper = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        // Log the actual error for debugging
        console.error(err);

        // Hide sensitive errors from the client
        const safeErrors = [
            'ValidationError',
            'UnauthorizedError',
            'ForbiddenError',
            'NotFoundError'
        ];

        if (safeErrors.includes(err.name)) {
            res.status(err.status || 400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred.' });
        }
    }
};

module.exports = {
    wrapper
};