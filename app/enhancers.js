import rxjsConfig from 'recompose/rxjsObservableConfig';
import {mapPropsStreamWithConfig, withStateHandlers, compose, withPropsOnChange} from 'recompose';
import Rx from 'rxjs';
import {includes} from 'lodash';
const mapPropsStream = mapPropsStreamWithConfig(rxjsConfig);
const usersCache = {};
// get data from users api on page change, on 500 failure retry 3 times.
// Cache and serve users if alredy cached
const dataStreamFactory = ($props) =>
    $props
        .distinctUntilChanged(({page}, {page: newPage}) => {
            return page === newPage;
        }).do(({onInputChange = () => {}}) => onInputChange(''))
        .switchMap(
            ({page = 1}) => {
                return usersCache[page] && Rx.Observable.of({users: usersCache[page]}) || Rx.Observable
                .ajax({
                    url: `./challenge/users?page=${page}`,
                    method: 'GET'}).
                retryWhen(error => {
                    return error
                        .flatMap((e) => {
                            if (e.status === 500) {
                                return Rx.Observable.of(error.status).delay(1000);
                            }
                            return Rx.Observable.throw({error: e});
                        })
                        .take(3)
                            .concat(Rx.Observable.throw({error: 'Sorry, there was an error (after 3 retries)'}));
                })
                .do(({response}) => usersCache[page] = response.Users || [])
                .map(({response}) => ({
                    loading: false,
                    users: response && response.Users || []
                }))
                .catch((e) => Rx.Observable.of({
                        loading: false,
                        error: e,
                        data: []
                    })
                )
                .startWith({loading: true});
            });


export const getDataenhancer = mapPropsStream(props$ => {
    return (dataStreamFactory(props$)).combineLatest(props$, (overrides= {}, props = {}) => ({
        ...props,
        ...overrides
    }));
});
export const getPageEnhancer = withStateHandlers( ({ initialPage = 1 }) => ({
      page: initialPage
    }),
    { getPage: () => (page) => ({ page })
});
export const showHideDetail = withStateHandlers( {},
    { showDetail: () => (id) => ({selUser: id}),
      hideDetail: () => () => ({selUser: undefined})
});
export const searchChange = withStateHandlers( {search: ''}, {
    onInputChange: () => (val) => {
        return {search: val};
    }
});
export const mapUsers = withPropsOnChange(({users}, {users: nUsers}) => nUsers && nUsers.length > 0 && users !== nUsers, ({users}) => ({users}));

export const filterUsers = withPropsOnChange(({users, search}, {users: nUsers, search: nSearch}) => nUsers && nUsers.length > 0 && (users !== nUsers || search !== nSearch), ({users = [], search}) => ({users: !search && users || users.filter(u => includes(u.email, search))}));

export const mapUser = withPropsOnChange(({selUser}, {selUser: nselUser}) => selUser !== nselUser, ({selUser, users = []}) => ({user: users.filter((u) => u.id === selUser).pop()}));

export default compose(getPageEnhancer, searchChange, getDataenhancer, mapUsers, showHideDetail, mapUser, filterUsers);
