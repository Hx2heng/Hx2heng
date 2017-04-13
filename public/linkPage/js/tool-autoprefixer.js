$('#tool-btn').on('click', function() {
    var inputVal = $('#tool-input').val();
    if (!$.trim(inputVal)) {
        $('.tool-alert').addClass('alert-danger').html('请输入内容');
        return false;
    } else {
        $('.tool-alert').removeClass('alert-danger').addClass('alert-success').html('转换中');
        $.ajax({
            url: 'tool/tool-autoprefixer',
            type: 'get',
            data: { str: inputVal },
            success: function(res) {
                $('#tool-output').val(res);
                $('.tool-alert').removeClass('alert-danger').addClass('alert-success').html('转换成功');
            },
            error: function(err) {
                $('.tool-alert').addClass('alert-danger').html(err.responseText);
            }
        });
    }
})