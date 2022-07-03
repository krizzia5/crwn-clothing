import "./directory.styles.scss";
import CategoryItem from '../category-item/category-item.components';

const Directory = ({ categories }) => {
    return (
        <div className="directories-container">
            {categories.map(( category ) => (
            <CategoryItem key={category.id} category={category}/>
            ))}
      </div>
    )
}

export default Directory;