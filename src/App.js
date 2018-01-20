import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
     // State가 바뀔 때마다 render()가 실행된다.
     // State는 직접적으로 접근하면 안된다. this.setState()를 이용하여 접근한다.
     state = {
          //greeting: 'Hello!'
     }

     // Component Render: componentWillMount() -> render() -> componentDidMount()
     // Component Update: componentWilReceiveProps() -> shouldComponentUpdate() == true ->
     //                                 componentWillUpdate() -> render() -> componentDidUpdate()
     componentWillMount(){

     }

     componentDidMount(){
          this._getMovies();

          // promise 객체를 이용하면...
          // 비동기적으로 작업을 진행할 수 있다.
          // 성공, 실패 각각의 시나리오를 구성할 수 있다.

          // 컴포넌트 mount가 끝나고 componentDidMount()의 setTime()의 this.setState()가 실행되면
          // state가 Hello!에서 Hello again! 변경되며 render() 실행
          // setTimeout(() => {
          //      this.setState({
          //           greeting: 'Hello again!'
          //      })
          // }, 3000);
          //
          // console.log(1);
          //
          // setTimeout(() => {
          //      this.setState({
          //           movies: [
          //                {
          //                     title: "Matrix",
          //                     poster: "https://vignette.wikia.nocookie.net/matrix/images/b/bb/433px-TheMatrix_Poster.jpg/revision/latest?cb=20060828225149",
          //                },
          //                {
          //                     title: "Full Metal Jacket",
          //                     poster: "https://static.rogerebert.com/uploads/movie/movie_poster/full-metal-jacket-1987/large_bleZBRX8XH6e9PR00aGCvdjvu3Q.jpg"
          //                },
          //                {
          //                     title: "Oldboy",
          //                     poster: "https://upload.wikimedia.org/wikipedia/en/6/67/Oldboykoreanposter.jpg"
          //                },
          //                {
          //                     title: "Star Wars",
          //                     poster: "https://www.billboard.com/files/media/star-wars-logo-yellow-font-2015-billboard-650.jpg"
          //                },
          //                {
          //                     title: "Transporter",
          //                     poster: "https://i.pinimg.com/originals/ab/4a/d2/ab4ad25e2284a40e05a0e6025cdd038b.jpg"
          //                },
          //                //...this.state.movies // 이전에 가지고 있던 영화 목록 전체를 의미한다.
          //           ]
          //      })
          // }, 5000)

          //console.log(2);
     }

     _renderMovies = () => {
          const movies = this.state.movies.map((movie) => {
               return <Movie
                    title={movie.title_english}
                    poster={movie.medium_cover_image}
                    key={movie.id}
                    genres={movie.genres}
                    synopsis={movie.synopsis} />
          });

          return movies;
     }

     _getMovies = async () => {
          // await은 _callApi()가 끝나기(성공/실패)를 기다린다. 그리고 return 값을 movies에 넣는다.
          // await-async는 한 쌍이다.
          const movies = await this._callApi();

          // 이건 _callApi가 끝나야 실행된다.
          this.setState({
               movies // == movies: movies
          });
     }

     _callApi = () => {
          // fetch를 이용한 Ajax로 영화 정보를 가져온다.
          return fetch("https://yts.am/api/v2/list_movies.json?sort_by=rating") // 이걸 실행한 후
          .then(response => response.json()) // then()을 실행하라. then()의 파라미터는 fetch의 결과물이 담긴 객체다. 여기서는 그걸 json 형식으로 바꾼다.
          .then(json => json.data.movies)
          .catch(err => console.log(err)); // 근데 에러가 나면 알려줘라.
     }

     render() {
          // [loading state 동작 과정]
          // 1. 처음에 render()가 실행되면 state에 moives가 없으므로 화면에는 Loading이 출력된다.
          // 2. componentDidMount()에 의해 5000ms state에 movies가 추가된다.
          // 3. state가 변경되면 render()가 실행된다.
          // 4. 이때는 state에 movies가 있으므로 사용자가 정의한 _renderMovies()가 실행된다.
          // 5. Loading 대신 영화 목록이 화면에 출력된다.
          const {movies} = this.state;

          return (
               <div className={movies ? "App" : "App--loading"}>
                    {movies ? this._renderMovies() : 'Loading'}
               </div>
          );
     }
}

export default App;
