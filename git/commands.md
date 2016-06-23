#Git commands

#####Create new branch
**git checkout -b your_branch**
**git push -u origin your_branch**

#####Remove local branch
**git branch -d your_branch**

#####Remove a remote branch (**caution**)
**git push origin :your_branch**

#####Resetting local branch to last committed stage
**git reset --hard HEAD**

#####Reseting local branch to origin
**git fetch origin**
**git reset --hard origin/your_branch**

#####Revert
**Obs:** Reset do not alter existing commit history - git revert should be used to undo changes 
on a public branch, and git reset for undoing changes on a private branch
**git revert HEAD~2** - Reverts branch to the second to last commit
**git revert commit_id** - reverts to specified commit


#####Stash
**git stash list**
**git stash show stash@{XX}** - Where XX is the number of the stash shown in stash list
**git stash pop**
**git stash apply stash@{XX}** - Like pop, but do not remove the stash from the stash-list
**git stash clear** - removes all stashed states
**git stash drop** - removes the first stashed state from stash list (or the one specified)

#####Log
**git log -3** - 3 last commits
**git log --after="yesterday"** - Things committed today. Alt: "July 1st, 2014"
**git log --after="2014-7-1" --before="2015-7-4"** - Things commited between July 1:st and July 4th 2014
**git log --author="bo.eriksson"**
**git log --grep="JRA-224:"**
**git log -- foo.py bar.py** - All commits affecting foo.py or bar.py files
**git log -S"Hello, World"** - All commits that added or removed "Hellow, World"
**git log -G"<regex>** - Same as above but with regex search
**git log <since-commit-id>..<until-commit-id>** - Search for commits in a range between two commits
**git log --no-merges** - the --no-merges flag filters away merge commits
**git log --graph --oneline --decorate** - More graphical log
**git log --pretty=oneline** - logs commits with comments

#####Diff
**git diff commit1 commit2**
**git diff HEAD~10 HEAD~5** - Diff between 10:th latest commit and 5:th latest
**git diff --name-only commit1 commit2** 
**git diff --name-status commmit1 commit2** - like name only, xcept you get a prefix telling what happend (modified, deleted, added)
**git diff --name-status --oneline** - "oneLine": One Line






