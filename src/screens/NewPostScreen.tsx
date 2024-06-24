import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  VStack,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import {Post, StackNavigation} from '../utils/types';
import {usePosts} from '../utils/usePost.hook';
import {Text} from '@gluestack-ui/themed';
import {ChevronLeft} from 'lucide-react-native';

const NewPostScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const {createPost, creatingPost, posts} = usePosts() ?? {posts: []};
  const navigation = useNavigation<StackNavigation>();

  const validateForm = () => {
    let isValid = true;
    // Reset validation errors
    setTitleError('');
    setBodyError('');

    if (!title.trim()) {
      setTitleError('Title is required.');
      isValid = false;
    }
    if (!body.trim()) {
      setBodyError('Body is required.');
      isValid = false;
    }

    return isValid;
  };

  const handleCreatePost = async () => {
    if (!validateForm()) return; // Stop the submission if validation fails

    const newPost: Post = {
      userId: 1,
      id: posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1,
      title,
      body,
    };

    createPost && (await createPost(newPost));
    navigation.navigate('Home'); // Redirect back to HomeScreen
  };

  return (
    <Box flex={1} p="$4" bgColor="$background">
      <Center>
        <Box
          pl={'$2'}
          mb="$4"
          flexDirection="row"
          alignItems="center"
          w={'$full'}>
          <Button
            w={'$10'}
            rounded={'$full'}
            bgColor={'$white'}
            onPress={() => navigation.goBack()}>
            <ButtonIcon as={ChevronLeft} color="$black" rounded={'$full'} />
          </Button>
          <Text fontSize={20} fontWeight={'$bold'} textTransform="capitalize">
            Create New Post
          </Text>
        </Box>
        <VStack gap="$4">
          <CustomInput
            type="text"
            label="Title"
            value={title}
            onChange={e => setTitle(e.nativeEvent.text)}
            placeholder="Enter post title"
            errorText={titleError}
            isInvalid={!!titleError}
          />
          <CustomInput
            type="text"
            label="Body"
            value={body}
            onChange={e => setBody(e.nativeEvent.text)}
            placeholder="Enter post body"
            errorText={bodyError}
            isInvalid={!!bodyError}
          />
          <Button onPress={handleCreatePost} disabled={creatingPost}>
            <ButtonText>
              {creatingPost ? 'Creating Post...' : 'Create Post'}
            </ButtonText>
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default NewPostScreen;
