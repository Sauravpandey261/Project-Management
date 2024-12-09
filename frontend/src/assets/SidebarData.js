import { Briefcase, CheckCheckIcon, Code, X } from "lucide-react";

export const Data = [
    {
        title: 'All Tasks',
        icon: Briefcase,
        link: '/'
    },
    {
        title: 'Important Tasks',
        icon: Code,
        link: '/important'
    },
    {
        title: 'Completed Tasks',
        icon: CheckCheckIcon,
        link: '/complete'
    },
    {
        title: 'Incompleted Tasks',
        icon: X,
        link: '/incomplete'
    },
]