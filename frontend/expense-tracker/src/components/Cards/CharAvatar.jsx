import React from 'react'
import { getInitials } from '../../utils/helper'
const CharAvatar = ({fullName,width,height,style}) => {
  return (
    <div
        className={`${width||"w-22"} ${height||"h-12"} ${style||""} flex items-center justify-center rounded-full text-gray-9`}
    >
     {getInitials(fullName||"")} 
    </div>
  )
};

export default CharAvatar;
