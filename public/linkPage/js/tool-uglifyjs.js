$('#tool-btn').on('click', function() {
    var inputVal = $('#tool-input').val();
    if (!$.trim(inputVal)) {
        return false;
    } else {
        $.ajax({
            url: 'tool/tool-uglifyjs',
            type: 'get',
            data: { str: inputVal },
            success: function(res) {
                $('#tool-output').val(res);
            }
        });
    }
})