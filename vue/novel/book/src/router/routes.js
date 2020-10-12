export const routes = [
    {
        path:'/register',
        name:'Register',
        component: r => require(['../views/Register.vue'], r),
    },
    {
        path: '/login',
        name: 'Login',
        component: r => require(['../views/Login.vue'], r)
      },
    {
        path:'/main',
        name:'Main',
        component: r => require(['../views/Main.vue'], r),
        children:[
            {
                path:'bookcity',
                name:'Bookcity',
                component: r => require(['../views/mainViews/Bookcity.vue'], r)
            },
            {
                path:'bookshelf',
                name:'Bookshelf',
                component: r => require(['../views/mainViews/Bookshelf.vue'], r)
            },
            
            {
                path:'category',
                name:'Category',
                component: r => require(['../views/mainViews/Category.vue'], r)
            },
            {
                path:'my',
                name:'My',
                component: r => require(['../views/mainViews/My.vue'], r)
            },

        ]
    },
    {
        path:"/subcategory",
        name:"Subcategory",
        component: r => require(['../views/Subcategory.vue'], r)
    },
    {
        path:"/detail",
        name:"Detail",
        component: r => require(['../views/Detail.vue'], r)
    },
    {
        path:"/ranking",
        name:"Ranking",
        component: r => require(['../views/Ranking.vue'], r)
    },
    {
        path:"/pay",
        name:"Pay",
        component: r => require(['../views/Pay.vue'], r)
    },
    {
        path:"/accountManage",
        name:"AccountManage",
        component: r => require(['../views/AccountManage.vue'], r)
    },
    {
        path:"/secure",
        name:"Secure",
        component: r => require(['../views/Secure.vue'], r)
    },
    {
        path:"/search",
        name:"Search",
        component: r => require(['../views/Search.vue'], r)
    },
    {
        path:"/reading",
        name:"Reading",
        component: r => require(['../views/Reading.vue'], r)
    },
    {
        path:"/catalogue",
        name:"Catalogue",
        component: r => require(['../views/Catalogue.vue'], r)
    },
    {
        path:"/consume",
        name:"Consume",
        component: r => require(['../views/Consume.vue'], r)
    },
    {
        path:"/recharge",
        name:"Recharge",
        component: r => require(['../views/Recharge.vue'], r)
    },
    
    {
        path: '*',
        redirect: {
          name: 'Register'
        }
      }
]