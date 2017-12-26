(function() {
    var burger = document.querySelector('.navbar-burger');
    var menu = document.querySelector('.navbar-menu');
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
})();

const WP_URL = 'http://10.32.10.134/wordpress/wp-json/wp/v2/';

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

(function() {
    axios.get(WP_URL + 'posts?_embed').then(function (response) {
        if(response.status == 200) {            
            var wp = new Vue({
                el: '#wp',
                data: {
                    post: {},
                    posts: response.data
                }
            });
            
        }                        
    }).catch(function (error) {
        console.log(error);
    });
})();

// var posts = new Vue({

// 	el: '#wp',

// 	data: {
// 		authors: ['1'],
// 		currentAuthor: '1',
// 		posts: null
// 	},

// 	created: function() {
// 		this.fetchData()
// 	},

// 	watch: {
// 		currentAuthor: 'fetchData'
// 	},

// 	methods: {
// 		fetchData: function() {
// 			var xhr = new XMLHttpRequest()
// 			var self = this
// 			xhr.open('GET', WP_URL + 'posts?_embed');
// 			xhr.onload = function() {
// 				self.posts = JSON.parse(xhr.responseText)
// 				console.log(self.posts[0].link)
// 			}
// 			xhr.send()
// 		}
// 	}
// })