import React from 'react';


// export default function Skeleton({ type = "" }) {
//     return <SkeletonStyle type={type}></SkeletonStyle>
// }

export default function Skeleton({ type = "" }) {
    if (type == 'comment') {
        return (
            <div className="p-4">
                <div className="flex space-x-4">
                    <div className="rounded-full animate-skeleton h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 animate-skeleton rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 animate-skeleton rounded col-span-2"></div>
                                <div className="h-2 animate-skeleton rounded col-span-1"></div>
                            </div>
                            <div className="h-2 animate-skeleton rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if (type == "rec") return <div className={`w-full h-full animate-skeleton`}></div>
    else if (type == "round") return <div className={`w-full h-full rounded-full animate-skeleton`}></div>


}
