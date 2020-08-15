require('./index.scss');

window["BlazorCKE"] = {
    init: function (params) {
        BalloonEditor
            .create(document.querySelector('#' + params.selector), {})
            .then(editor => {
                editor.setData(params.content ? params.content : '');
                editor.model.document.on('change:data', () => {
                    params.instance.invokeMethodAsync('updateText', editor.getData());
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
};


window.twttr = (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function (f) {
        t._e.push(f);
    };
    return t;
}(document, "script", "twitter-wjs"));

window.BlazorTwttr = {
    render: function (params) {
        console.log('render tweet', params);
        const container = document.getElementById('twitter-' + params.id);
        container.innerHTML = '';
        twttr.widgets.createTweet(
            params.tweetId + '', container,
            {
                theme: 'light'
            }
        );
    }
};
