import React from 'react';
import { ListGroup } from 'react-bootstrap';
import _ from 'lodash';

import { connect } from 'react-redux';
import { getHeroes } from '../actions/app'; 


class Heroes extends React.Component{

    constructor(props){
        super(props);
        this.state = {
           name:'',
           image:'',
           bio:'',
           links:[]
        };
        this.onDetail = this.onDetail.bind(this);
    };
    
    onDetail(id, items){
        
      const heroe =  _.find(items, ['id', id]);

       this.props.getHeroes(heroe); 
       this.setState({
        links: heroe.urls,
        name: heroe.name,
        image: heroe.thumbnail.path + '.' + heroe.thumbnail.extension,
        bio: heroe.description
        });
    
    };
    
    render(){
        const {items} = this.props;
        const {links,name,image,bio} = this.state;

        return ( <div className='row'> 
            <div className='col'>

            <ListGroup style={{maxHeight : '800px', overflow: 'auto'}} >
            {
              items.map((item,index)=> 
                  <ListGroup.Item key={index} style={{cursor : 'pointer'}} onClick={()=>{this.onDetail(item.id, items)}}>
                    <div className='row'>
                         <div className= 'col'> 
                                <img className='img-thumbnail' 
                                  alt={item.name} 
                                  src={item.thumbnail.path + '.' + item.thumbnail.extension}
                                >
                                </img> 
                         </div>
                         <div className= 'col'> 
                            <div >{item.name}</div>
                            <div>
                            <span>Comics:</span>
                            {item.comics.available > 0 ? <span className='badge badge-pill badge-success col'>Yes</span> : <span className='badge badge-pill badge-danger col'>No</span> }
                            <span>Series:</span>
                            {item.series.available > 0 ? <span className='badge badge-pill badge-success col'>Yes</span> : <span className='badge badge-pill badge-danger col'>No</span>}
                            <span>Events:</span>
                            {item.events.available > 0 ? <span className='badge badge-pill badge-success col'>Yes</span> : <span className='badge badge-pill badge-danger col'>No</span>}
                            <span>Stories:</span>
                            {item.stories.available > 0 ? <span className='badge badge-pill badge-success col'>Yes</span> : <span className='badge badge-pill badge-danger col'>No</span>}
                            </div>
                            
                         </div>
                    </div>
                  </ListGroup.Item>
              )
            }
            </ListGroup>
            </div>
            <div className='col'>
                <img className='img-thumbnail' 
                  alt={name} 
                  src={image}
                ></img>
                <div className='col-form-label font-weight-bold'>{name}</div>
                 <p className='mb-1'>{bio}</p>
                 <ul>
                    {
                      links.map((link,index)=> 
                          <li key={index + 1}>
                             <a href={link.url}> {link.url}</a>
                          </li>
                      )
                    }
                 </ul>
            </div>
         </div>)
        
    }
}

const mapDispatchToProps = dispatch => ({
  getHeroes : value => dispatch(getHeroes(value))
});

const HeroesConnnected = connect(null,mapDispatchToProps)(Heroes);

export default HeroesConnnected;