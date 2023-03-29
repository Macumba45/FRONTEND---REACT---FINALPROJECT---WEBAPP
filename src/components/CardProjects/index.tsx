import { useState, memo, useCallback, FC } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import * as React from 'react';
import Button from '@mui/material/Button';
import LinearWithValueLabel from '../ProgressLinear/index';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Props } from './type';
import VideoThumbail from './video/index';

import {
     CardContainer,
     Title,
     HeartButton,
     ContainerImg,
     ContainerButton,
     ContainerTitle,
     ContainerDesc,
     Description,
     ContainerLocations,
     Country,
     City,
     ContainerCategories,
     Categories,
     ContainerLinear,
     ContainerButtonModal,
     MenuButton,
     Menu,
     MenuItem,
     TotalInvestor,
     ContainerInvestor,
} from './styles';
import { UserRole } from '../../models/user';
import { getUserRole } from '../../services/storage/userRole';

const Card: FC<Props> = ({
     id,
     title,
     description,
     url,
     duration,
     totalInvest,
     totalInvestor,
     country,
     city,
     history,
     commerce,
     proposal,
     images,
     currency,
     cost,
     minimuminvestment,
     actionPerCredit,
     returnInvestment,
     goal,
     tags,
     limitvalue,
     createdAt,
     updatedAt,
     showHeartButton,
}) => {
     const [liked, setLiked] = useState(false);
     const navigate = useNavigate();
     const [showMenu, setShowMenu] = useState(false);
     const location = useLocation();
     const showMenuItems =
          location.pathname !== '/' && location.pathname !== '/welcome' && getUserRole() !== 'INVESTOR'
     console.log(showMenuItems);

     const handleClick = useCallback(() => {
          setLiked(!liked);
     }, [liked]);

     const handleMenuClick = useCallback(() => {
          setShowMenu(!showMenu);
     }, [showMenu]);


     const handleMenuClickClose = useCallback(() => {
          setShowMenu(showMenu);
     }, [showMenu]);




     const handleGoDetails = useCallback(() => {
          navigate('/projectdetails');
          window.scrollTo(0, 0);
     }, [navigate]);

     return (
          <CardContainer>
               <ContainerImg>
                    {/* <Image style={{ objectFit: 'cover' }} src={`${url}?autoplay=0&mute=1&controls=0&modestbranding=1&iv_load_policy=3&rel=0&showinfo=0`} /> */}
                    <VideoThumbail
                         src={url}
                         // width="270"
                         // height="270"
                         style={{ width: '100%', margin: 'auto' }}
                    />
               </ContainerImg>
               <ContainerButton>
                    {showHeartButton && (
                         <HeartButton liked={liked} onClick={handleClick}>
                              <FavoriteBorderIcon />
                         </HeartButton>
                    )}
               </ContainerButton>
               <ContainerTitle>
                    <Title>{title}</Title>
               </ContainerTitle>
               <ContainerInvestor>
                    <TotalInvestor>
                         Total investors: {totalInvestor}
                    </TotalInvestor>
               </ContainerInvestor>
               <ContainerInvestor>
                    <TotalInvestor>Finish at: {duration}</TotalInvestor>
               </ContainerInvestor>
               <ContainerDesc>
                    <Description>{description}</Description>
               </ContainerDesc>
               <ContainerLocations>
                    <Country>{country}</Country>
               </ContainerLocations>
               <ContainerLocations>
                    <City>{city}</City>
               </ContainerLocations>
               <ContainerCategories>
                    <Categories>
                         {tags ? tags.map((tag) => tag.name).join(' ') : ''}
                    </Categories>
               </ContainerCategories>
               <ContainerLinear>
                    <LinearWithValueLabel
                         current={totalInvest || 0}
                         min={0}
                         max={goal || 0}
                    />
               </ContainerLinear>
               <div>
                    <ContainerButtonModal>
                         <Button
                              variant="outlined"
                              sx={{
                                   color: '#7E1B75',
                                   marginBottom: '12px',
                                   borderColor: '#7E1B75',
                                   '&:hover': {
                                        backgroundColor: '#7E1B75',
                                        borderColor: '#7E1B75',
                                        color: 'white',
                                   },
                              }}
                              onClick={() => handleGoDetails()}
                         >
                              More Info
                         </Button>
                         <MenuButton onClick={handleMenuClick}>
                              {showMenuItems && <MoreVertIcon />}
                         </MenuButton>
                    </ContainerButtonModal>
                    {showMenuItems && showMenu && (
                         <Menu
                              onClick={handleMenuClickClose}>
                              <MenuItem>
                                   <DeleteIcon /> <EditIcon />
                              </MenuItem>
                         </Menu>
                    )}
               </div>
          </CardContainer>
     );
};

export default memo(Card);
