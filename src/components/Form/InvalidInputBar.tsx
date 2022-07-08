import { PencilAltIcon, MailIcon, LockClosedIcon } from '@heroicons/react/outline'
import { PropsWithChildren } from 'react';

interface Inputs<T> {
    type: 'text' | 'password' | 'email';
    name: string;
    value: T;
    isValid?: boolean;
    onBlur?: () => void;
    onChange: (value: T) => void;
}

function AutoIcon(props: { type: string, }) {
    if (props.type === 'email')
        return <MailIcon className="h-6" />
    else if (props.type === 'password')
        return <LockClosedIcon className="h-6" />
    return <PencilAltIcon className="h-6" />
}

export default function InvalidBar<T extends string | number>(props: PropsWithChildren<Inputs<T>>) {
    return (
        <label>
            <div className='absolute ml-2 mt-2 '>
                <div className='text-red-400'>
                    {<AutoIcon type={props.type}></AutoIcon>}
                </div>
            </div>
            <input
                type={props.type}
                placeholder={props.name + " is invalid."}
                value={props.value}
                onBlur={props.onBlur}
                autoComplete="on"
                onChange={(event) => props.onChange(event.target.value as T)}

                className="
                        mb-3
                        block
                        border-0
                        rounded-2xl
                        w-full
                      bg-red-100 
                      text-slate-800 
                      placeholder-red-500
                        pl-9"/>
        </label >
    )
}