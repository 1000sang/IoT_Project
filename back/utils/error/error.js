exports.createError = name =>
    class extends Error {
        constructor(message) {
            super(message)
            this.name = name
        }
    }