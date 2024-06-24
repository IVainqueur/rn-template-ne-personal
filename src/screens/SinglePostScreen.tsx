import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  FlatList,
  Text,
  View,
} from '@gluestack-ui/themed';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ChevronLeft} from 'lucide-react-native';
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {RootStackParamList, StackNavigation} from '../utils/types';
import {usePosts} from '../utils/usePost.hook';
import Dialog from '../components/Dialog';

type SinglePostScreenRouteProp = RouteProp<RootStackParamList, 'Single-Post'>;

const SinglePostScreen = () => {
  const {posts, comments, fetchComments, loadingComments, deletePost} =
    usePosts() ?? {};
  const route = useRoute<SinglePostScreenRouteProp>();
  const navigation = useNavigation<StackNavigation>();
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const postId = route.params?.postId;

  const handleDelete = async () => {
    if (postId) {
      deletePost && (await deletePost(Number(postId)));
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments && fetchComments(Number(postId));
    }
  }, []);

  const post = posts?.find(p => p.id === Number(postId));

  if (!post) {
    return <ActivityIndicator />;
  }

  return (
    <Box>
      <FlatList
        p={'$4'}
        refreshing={loadingComments}
        ListHeaderComponent={
          <>
            <Box flexDirection="row" gap={'$2'} alignItems="center">
              <Button
                w={'$10'}
                rounded={'$full'}
                bgColor={'$white'}
                onPress={() => navigation.goBack()}>
                <ButtonIcon as={ChevronLeft} color="$black" rounded={'$full'} />
              </Button>
              <Text
                fontSize={20}
                fontWeight={'$bold'}
                textTransform="capitalize"
                pr={'$10'}>
                {post.title}
              </Text>
            </Box>
            <Text fontSize={16} my={'$2'}>
              {post.body}
            </Text>
            <Button
              onPress={() => setShowDeleteConfirm(true)}
              bgColor="$red500">
              <ButtonText>Delete Post</ButtonText>
            </Button>
            <Text fontSize={18} fontWeight={'$bold'} mt={'$2'}>
              Comments:
            </Text>
          </>
        }
        ListEmptyComponent={
          <Text textAlign={'center'} color="$gray400">
            No comments found for this post
          </Text>
        }
        data={comments}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({item}: any) => (
          <View mb={'$2'} p={'$2'} borderRadius={8}>
            <Text fontSize={16} fontWeight={'$bold'} textTransform="capitalize">
              {item.name}
            </Text>
            <Text fontSize={12} mb={'$2'}>
              {item.email}
            </Text>
            <Text fontSize={14} mb={'$2'} textTransform="capitalize">
              {item.body}
            </Text>
          </View>
        )}
      />
      <Dialog
        showAlertDialog={showDeleteConfirm}
        setShowAlertDialog={setShowDeleteConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post?"
        confirmText="Delete"
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default SinglePostScreen;
