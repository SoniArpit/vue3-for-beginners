import { createRouter, createWebHistory } from 'vue-router';
import MarvelHeroes from "./pages/MarvelHeroes";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Markdown from "./pages/Markdown"
import Slider from "./pages/Slider"
import Calculator from "./pages/Calculator"
import ReusableModal from "./pages/ReusableModal"
import Chats from "./pages/Chats"
import store from './store/index'
import UserCrud from "./pages/UserCrud"
import Tensorflow from "./pages/Tensorflow"





const routes = [

    {
        path: "/marvel-heroes", component: MarvelHeroes
    },
    {
        path: "/calendar", component: Calendar
    },
    {
        path: "/", component: Home
    },
    {
        path: "/markdown", component: Markdown
    },
    {
        path: "/slider", component: Slider
    },
    {
        path: "/calculator", component: Calculator
        , meta: {
            middleware: 'auth'
        }
    },

    {
        path: "/reusable-modal", component: ReusableModal
    },
    {
        path: "/chats", component: Chats,
        meta: {
            middleware: 'auth'
        }
    },
    {
        path: "/usercrud", component: UserCrud
    },
    {
        path: "/tensorflow", component: Tensorflow
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes,

});

router.beforeEach((to, _, next) => {
    if (to.meta.middleware) {
        const middleware = require(`./middleware/${to.meta.middleware}`)
        if (middleware) {
            middleware.default(next, store)

        } else {
            next()
        }
    } else {
        next();
    }
})
export default router;