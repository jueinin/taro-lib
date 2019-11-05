
import Taro,{Component} from '@tarojs/taro';
import {BookListProps} from "../../types";
import {View} from "@tarojs/components";
import BookItem from "../BookItem/BookItem";
interface Props {
  bookList: BookListProps
}
class BookList extends Component<Props> {
  static defaultProps={
    bookList: []
  }
  render() {
    let {bookList} = this.props;
    return (
      <View>
        {bookList.map((book,index)=>{
          return <BookItem key={index} imgUrl={book.imgUrl} title={book.title} author={book.author} price={book.price}
                           comments={book.comments} goodComments={book.goodComments} bookId={book.bookId}/>
        })}
      </View>
    );
  }
}

export default BookList;
