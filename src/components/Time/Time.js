import React from 'react';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { ru } from 'date-fns/locale';

const Time = ({ date }) => {
    return <>
        {
            formatDistanceToNowStrict(new Date(date), { addSuffix: true, locale: ru })
        }
    </>
}


export default Time