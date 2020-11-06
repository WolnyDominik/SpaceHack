#include <vector>
#include "screen.h"
#include "screenManager.h"

#include <iostream>

Screen* ScreenManager::current = 0;
std::vector<Screen*> ScreenManager::screenStack;
ScreenManager::ScreenManager() {

}
void ScreenManager::pushScreen(Screen* screen) {
    if (screenStack.size()>0) current->pause();
    screenStack.push_back(screen);
    //if (current!=0) current->soundFrame.pause();
    current = screenStack.back();
}
Screen* ScreenManager::popScreen() {
    Screen* tmp = screenStack.back();
    if (screenStack.size()>0) tmp->soundFrame.pause();
    screenStack.pop_back();
    current = screenStack.back();
    return tmp;
}
void ScreenManager::clearBuffer() {
    screenStack.clear();
    current = screenStack.back();
}
void ScreenManager::update() {
    current->update();
    if (screenStack.size()>0) current->soundFrame.update();
}
void ScreenManager::draw() {
    current->draw();
}
bool ScreenManager::onClick(int x, int y, int button) {
    return current->onClick(x,y,button);
}
void ScreenManager::onDrag(int x, int y, int button) {
    current->onDrag(x,y,button);
}
void ScreenManager::onMove(int x, int y){
    current->onMove(x,y);
}
void ScreenManager::onKeyDown(int key){
    current->onKeyDown(key);
}
void ScreenManager::onKeyUp(int key){
    current->onKeyUp(key);
}