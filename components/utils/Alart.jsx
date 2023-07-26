import React, { useEffect, useState } from 'react'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
// import { useSnap } from '@mozeyinedu/hooks-lab';

export default function Alart({ children, type = "success", hide = true, onHide }) {
    // const { snap } = useSnap(.5);
    const [show, setShow] = useState(hide)

    useEffect(() => {
        if (!show) {
            onHide ? onHide(false) : ''
        }
    }, [show])

    return show ?
        <div style={{
            width: '100%',
            padding: '12px',
            position: 'relative',
            background: (function () {
                if (type === 'warning') {
                    return 'rgb(247 244 158 / 75%)'
                }
                else if (type === 'error') {
                    return 'rgb(255 152 152 / 30%)'
                }
                else {
                    return 'rgb(156 233 159 / 30%)'
                }
            }()),
            fontSize: '.8rem',
            color: (function () {
                if (type === 'warning') {
                    return 'rgb(199 166 8)'
                }
                else if (type === 'error') {
                    return 'rgb(227 6 6)'
                }
                else {
                    return 'rgb(86 159 3)'
                }
            }()),
            borderRadius: '5px',
            border: (function () {
                if (type === 'warning') {
                    return '1px solid rgb(191 185 8 / 63%);'
                }
                else if (type === 'error') {
                    return '1px solid rgb(255 151 151 / 63%)'
                }
                else {
                    return '1px solid rgb(118 219 2)'
                }
            }()),
            display: 'flex',
            alignItems: 'center'


        }}>
            <div style={{
                color: (function () {
                    if (type === 'warning') {
                        return '#b1a411'
                    }
                    else if (type === 'error') {
                        return '#ff0808a1'
                    }
                    else {
                        return '#87d5b8d1'
                    }
                }()),
                padding: '2px',
                cursor: 'pointer',
                borderRadius: '50%',
                position: 'absolute',
                right: '2px',
                top: '2px',
                userSelect: 'none',
            }}
                // {...snap()}
                onClick={() => setShow(!show)}
            >
                X
            </div>
            <div style={{ marginRight: '5px' }}>
                {(function () {
                    if (type === 'warning') {
                        return <ReportGmailerrorredIcon />
                    }
                    else if (type === 'error') {
                        return <ReportGmailerrorredIcon />
                    }
                    else {
                        return <ReportGmailerrorredIcon />
                    }
                }())}
            </div>
            <div>{children}</div>
        </div> : ''
}
