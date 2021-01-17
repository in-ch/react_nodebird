import React, { useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => {
  useEffect(()=>{
    console.log(postData);
  },[])
  return(
    postData
  )
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
