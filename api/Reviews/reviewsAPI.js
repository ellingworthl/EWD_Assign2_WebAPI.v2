import _ from 'lodash';

  const  posts = [
         {  id: 1 ,
        title : 'IFAF is great for Field Archery in Ireland',
        link : 'http://ifaf.ie/wordpress/',
        forename : 'Marion',
        surname : 'Hood',
        association : 'IFAF',
        comments : [],
        upvotes : 10
      },
     { 
        id: 2,
        title : 'International Field Archery Assn: Q1 2017 newsletter is out!',
        link : 'http://www.ifaa-archery.org/index.php/ifaa-newsletters/2017',
        forename : 'William',
        surname : 'Tell',
        association : 'FAAS',
        comments : [],
        upvotes : 9
      },
      { 
        id: 3,
        title : 'Membership in NFAS (UK) nearing 10k',
        link : 'http://www.nfas.net/home.asp',
        forename : 'Rob',
        surname : 'Hood',
        association : 'EFAA',
        comments : [],
        upvotes : 5
      },
      { 
        id: 4,
        title : 'New site with loads of FREE online archery games. Great fun.',
        link : 'http://www.bgames.com/archery-games/',
        forename : 'Friar',
        surname : 'Tuck',
        association : 'AAE',
        comments : [],
        upvotes : 2
      }
      ] ;


     const stubAPI = {
         getAll : () => {
            return posts ;
          },
         add : (t,l) => {
              let id = 1 ;
              const last = _.last(posts) ;
              if (last) {
                 id = last.id + 1 ;
              }
              let len = posts.length ;
              let newL_len = posts.push({
                  'id': id,  
                 title: t, link : l, username: '', comments: [], upvotes: 0 }) ;
               return newL_len > len?id:-1;
              },
         upvote : (id) => {
             const index = _.findIndex(posts,
                   function(post) {
                    return post.id == id;
                  } );   
             if (index !== -1) {                 
                  posts[index].upvotes += 1 ;
                  return true ;
                }
              return false ;
           },
         getPost : (id) => {
            let result = null ;
            const index = _.findIndex(posts,
                   function(post) {
                    return post.id == id;
                  } );     
             if (index !== -1) {                
                result = posts[index];
                    }
            return result;            
            },
         addComment :(postId,c,n) => {
            let result = false;
            const post = stubAPI.getPost(postId);
            let id = 1 ;
            if (post){
            const last = _.last(post.comments) ;
            if (last) {
               id = last.id + 1 ;
            }
            post.comments.push({ 'id': id,  
                     comment: c , author: n, upvotes: 0 } ) ;
            result = true;
            }
          return result;
            },
         upvoteComment : (postId,commentId) => {
            let result = false;
            const post = stubAPI.getPost(postId) ;
            if (post){
            const index = _.findIndex(post.comments, function(c) {
                      return c.id == commentId;
                    });  
             if (index !== -1) {                 
                 post.comments[index].upvotes += 1 ;
                 result = true
                }
              }
            return result;
          }
      }
    export default reviewsAPI ;