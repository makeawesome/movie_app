// import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis'
import './Movie.css';

// class Movie extends Component{
//      static propTypes = {     // props의 type과 존재 여부 검사. propTypes는 예약어이다.
//           title: PropTypes.string.isRequired,
//           poster: PropTypes.string
//      }
//
//      render(){
//           console.log(this.props); // 1. App 컴포넌트에서 받은 js객체가 출력됨
//
//           // 2. Movie 컴포넌트는 MoviePoster 컴포넌트에 App 컴포넌트에서
//           // 받은 객체 중 poster에 저장된 데이터를 전달
//           return (
//                <div>
//                     <MoviePoster poster={this.props.poster} />
//                     <h1>{this.props.title}</h1>
//                </div>
//           );
//      }
// }

// class MoviePoster extends Component{
//      render(){
//           console.log(this.props); // 3. Movie 컴포넌트에서 받은 js객체가 출력됨
//
//           return(
//                <img src={this.props.poster} alt="movie-img"/>
//           );
//      }
// }

// state가 있는 컴포넌트 = smart component
// state가 없는 컴포넌트 = dumb component (stateless functional component). props는 가지고 있다.
// dum component는 class component 말고 function component로 변경 가능하다. 오직 return을 위해 존재한다.
// 라이프사이클도 없다.
function Movie({title, poster, genres, synopsis}){
     return(
          <div className="Movie">
               <div className="Movie__Column">
                    <MoviePoster poster={poster} alt={title}/>
               </div>
               <div className="Movie__Column">
                    <h1>{title}</h1>
                    <div className="Movie__Genres">
                         {genres.map((genre, index) => <MovieGenre genre={genre} key={index} />)}
                    </div>
                    <div className="Movie__Synopsis">
                         <LinesEllipsis
                              text={synopsis}
                              maxLine='3'
                              ellipsis='...'
                              trimRight
                              basedOn='letters'/>
                    </div>
               </div>
          </div>
     );
}

function MoviePoster({poster, alt}){
     return(
          <img src={poster} alt={alt} title={alt} className="Movie__Poster"/>
     );
}

function MovieGenre({genre}){
     return(
          <span className="Movie__Genre">{genre} </span>
     )
}

Movie.propTypes = {
     title: PropTypes.string.isRequired,
     poster: PropTypes.string.isRequired,
     genres: PropTypes.array.isRequired,
     synopsis: PropTypes.string.isRequired
}

MoviePoster.propTypes = {
     poster: PropTypes.string.isRequired,
     alt: PropTypes.string.isRequired
}

MovieGenre.propTypes = {
     genre: PropTypes.string.isRequired
}

export default Movie;
