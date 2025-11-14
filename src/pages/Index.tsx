import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  author: string;
  authorAvatar: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
}

const mockMedia: MediaItem[] = [
  { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800', title: 'Абстрактное искусство', author: 'Анна Иванова', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna', likes: 342, isLiked: false, isSaved: false },
  { id: 2, type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', thumbnail: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800', title: 'Big Buck Bunny', author: 'Иван Петров', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan', likes: 1254, isLiked: false, isSaved: false },
  { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800', title: 'Неоновый город', author: 'Мария Сидорова', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', likes: 892, isLiked: true, isSaved: false },
  { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800', title: 'Космос', author: 'Дмитрий Козлов', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry', likes: 2341, isLiked: false, isSaved: true },
  { id: 5, type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800', title: 'Elephants Dream', author: 'Елена Волкова', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', likes: 567, isLiked: false, isSaved: false },
  { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', title: 'Цифровое будущее', author: 'Сергей Новиков', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey', likes: 445, isLiked: false, isSaved: false },
  { id: 7, type: 'image', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800', title: 'Градиенты', author: 'Ольга Смирнова', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga', likes: 678, isLiked: true, isSaved: true },
  { id: 8, type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumbnail: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800', title: 'For Bigger Blazes', author: 'Алексей Попов', authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexey', likes: 923, isLiked: false, isSaved: false },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'feed' | 'videos' | 'saved' | 'profile'>('home');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(mockMedia);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const handleLike = (id: number) => {
    setMediaItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  };

  const handleSave = (id: number) => {
    setMediaItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isSaved: !item.isSaved } : item
      )
    );
  };

  const filteredMedia = activeTab === 'videos' 
    ? mediaItems.filter(item => item.type === 'video')
    : activeTab === 'saved'
    ? mediaItems.filter(item => item.isSaved)
    : mediaItems;

  return (
    <div className="min-h-screen bg-background font-['Inter']">
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-['Montserrat'] bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            MediaHub
          </h1>
          
          <nav className="hidden md:flex items-center gap-6">
            {[
              { id: 'home', label: 'Главная', icon: 'Home' },
              { id: 'feed', label: 'Лента', icon: 'Grid3x3' },
              { id: 'videos', label: 'Видео', icon: 'Video' },
              { id: 'saved', label: 'Избранное', icon: 'Bookmark' },
              { id: 'profile', label: 'Профиль', icon: 'User' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon as any} size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>

          <Button size="icon" variant="ghost" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredMedia.map((item, index) => (
            <Card
              key={item.id}
              className="break-inside-avoid overflow-hidden group cursor-pointer animate-fade-in hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative" onClick={() => setSelectedMedia(item)}>
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="relative">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                          <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                            <Icon name="Play" size={32} className="text-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-sm flex items-center gap-1">
                          <Icon name="Video" size={14} />
                          Видео
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl p-0 bg-card border-border">
                  {selectedMedia && (
                    <div className="relative">
                      {selectedMedia.type === 'image' ? (
                        <img src={selectedMedia.url} alt={selectedMedia.title} className="w-full h-auto" />
                      ) : (
                        <video src={selectedMedia.url} controls className="w-full h-auto bg-black" autoPlay />
                      )}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={selectedMedia.authorAvatar} />
                              <AvatarFallback>{selectedMedia.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">{selectedMedia.title}</h3>
                              <p className="text-sm text-muted-foreground">{selectedMedia.author}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant={selectedMedia.isLiked ? 'default' : 'outline'}
                              onClick={() => handleLike(selectedMedia.id)}
                            >
                              <Icon name="Heart" size={20} fill={selectedMedia.isLiked ? 'currentColor' : 'none'} />
                            </Button>
                            <Button
                              size="icon"
                              variant={selectedMedia.isSaved ? 'default' : 'outline'}
                              onClick={() => handleSave(selectedMedia.id)}
                            >
                              <Icon name="Bookmark" size={20} fill={selectedMedia.isSaved ? 'currentColor' : 'none'} />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Icon name="Heart" size={16} />
                          {selectedMedia.likes} лайков
                        </p>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={item.authorAvatar} />
                      <AvatarFallback>{item.author[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{item.author}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-3 line-clamp-2">{item.title}</h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon name="Heart" size={14} />
                    {item.likes}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(item.id);
                      }}
                    >
                      <Icon 
                        name="Heart" 
                        size={18} 
                        className={item.isLiked ? 'text-red-500' : ''}
                        fill={item.isLiked ? 'currentColor' : 'none'}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSave(item.id);
                      }}
                    >
                      <Icon 
                        name="Bookmark" 
                        size={18}
                        className={item.isSaved ? 'text-primary' : ''}
                        fill={item.isSaved ? 'currentColor' : 'none'}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-20">
            <Icon name="Inbox" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Пусто</h3>
            <p className="text-muted-foreground">Здесь пока нет контента</p>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 md:hidden border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 z-50">
        <div className="flex justify-around py-3">
          {[
            { id: 'home', icon: 'Home' },
            { id: 'feed', icon: 'Grid3x3' },
            { id: 'videos', icon: 'Video' },
            { id: 'saved', icon: 'Bookmark' },
            { id: 'profile', icon: 'User' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name={tab.icon as any} size={24} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
