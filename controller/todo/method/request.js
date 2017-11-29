module.exports = {
    success: (data) => ({
        'result': 1,
        'data': data || null,
        'message': 'Request to Database success'
    }),
    
    error: (message, result) => ({
        'result': result || 0,
        'data': null,
        'message': message
    })
}