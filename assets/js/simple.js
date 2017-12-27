(function() {
    var burger = document.querySelector('.navbar-burger');
    var menu = document.querySelector('.navbar-menu');
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();

var app = new Vue({
    el: '#app',
    data: {               
        todos: [
            { id:1, text: 'Learn JavaScript', done: false },
            { id:2, text: 'Learn Vue', done: false },
            { id:3, text: 'Build something awesome', done: false }
        ]
    },
    methods: {
        inputTask: function(){
            this.todos.push({ id: this.todos.length + 1, text: document.getElementById('item').value});
            document.getElementById('item').value = "";
        },
        removeTask(index) {
            this.$delete(this.todos, index);
        },
        completeTask(index) {
            this.todos[index].done = true;        
            Vue.set(this.todos, index, this.todos[index]);
        }
    }
});

const WP_URL = 'http://10.32.10.134/wordpress/wp-json/wp/v2/posts?_embed';

var wp = new Vue({
    el: '#wp',
    data: {
        post: {},
        posts: null
    },
    created: function(){
        this.fetchData();
    },
    methods: {        
        fetchData: function() {
            var self = this;
            axios.get(WP_URL).then(function (response) {
                if(response.status == 200) {                            
                    self.posts = response.data;
                }                        
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
});