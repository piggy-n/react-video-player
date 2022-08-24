const importAll = (requireContext: any) => requireContext
    .keys()
    .forEach(requireContext);

try {
    importAll((require as any).context('../../assets/iconfont/', true, /\.svg$/));
} catch (e) {
    console.error(e);
}