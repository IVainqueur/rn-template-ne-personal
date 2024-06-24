import {
  AddIcon,
  Box,
  Button,
  ButtonText,
  Fab,
  FabIcon,
  FabLabel,
  FlatList,
  Text,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {ArrowUpIcon, TrashIcon} from 'lucide-react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Dialog from '../components/Dialog';
import RotatingText from '../components/RotatingText';
import {StackNavigation} from '../utils/types';
import {usePosts} from '../utils/usePost.hook';

const HomeScreen = () => {
  const {
    loadingPosts: loading,
    fetchPosts,
    posts,
    deletePost,
    reset
  } = usePosts() ?? {};
  const [postToDelete, setPostToDelete] = React.useState<number | null>(null);
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);

  const navigation = useNavigation<StackNavigation>();

  const flatListRef = React.useRef<any>(null);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const handleDeletePost = async () => {
    if (postToDelete) {
      deletePost && (await deletePost(postToDelete));
      setPostToDelete(null);
    }
  };

  return (
    <Box h={'$full'}>
      <FlatList
        onScroll={e => {
          if (e.nativeEvent.contentOffset.y > 100) {
            setShowScrollToTop(true);
          } else {
            setShowScrollToTop(false);
          }
        }}
        ref={flatListRef}
        p={'$4'}
        ListHeaderComponent={
          <>
            <Box flexDirection="row">
              <RotatingText />
              <Text fontSize={30} fontWeight={'$bold'}>
                Welcome back!
              </Text>
            </Box>
            <Text mb={'$2'}>Here are today's {posts?.length} posts:</Text>
            <Button onPress={reset} bgColor="$red400">
              <ButtonText>Reset Posts</ButtonText>
            </Button>
          </>
        }
        ListFooterComponent={
          <>
            <Text mt={'$2'}>End of posts</Text>
          </>
        }
        onRefresh={() => {
          fetchPosts && fetchPosts();
        }}
        refreshing={loading}
        data={posts ?? []}
        renderItem={({item}: any) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Single-Post', {postId: item.id})
            }>
            <Box p={'$2'} my={'$2'} borderRadius={8} bgColor="$gray400">
              <Text
                fontSize={20}
                fontWeight={'$bold'}
                textTransform="capitalize">
                {item.title}
              </Text>
              <Text>{item.body}</Text>
              <Fab
                bg="$red400"
                $hover-bgColor="$red500"
                $focus-bgColor="$red500"
                $active-bgColor="$red600"
                size="lg"
                right="$2"
                bottom="$2"
                isHovered={false}
                isDisabled={false}
                onPress={() => setPostToDelete(item.id)}
                isPressed={false}>
                <FabIcon as={TrashIcon} h="$4" w="$4" />
              </Fab>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item: any) => item.id.toString()}
      />
      <Fab
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={() => {
          navigation.navigate('New-Post');
        }}>
        <FabIcon as={AddIcon} mr="$1" />
        <FabLabel>New Post</FabLabel>
      </Fab>
      {showScrollToTop && (
        <Fab
          size="md"
          placement="bottom left"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
          onPress={() => {
            scrollToTop();
          }}>
          <FabIcon as={ArrowUpIcon} mr="$1" />
          <FabLabel>Scroll to Top</FabLabel>
        </Fab>
      )}
      <Dialog
        showAlertDialog={!!postToDelete}
        setShowAlertDialog={show => {
          if (!show) {
            setPostToDelete(null);
          }
        }}
        title={'Delete Post ' + postToDelete}
        message="Are you sure you want to delete this post?"
        confirmText="Delete"
        onConfirm={handleDeletePost}
      />
    </Box>
  );
};

export default HomeScreen;
